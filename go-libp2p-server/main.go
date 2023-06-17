package main

import (
	"encoding/json"
	"bytes"
	"bufio"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"os/exec"
	"regexp"
	"strings"

	"github.com/libp2p/go-libp2p"
	"github.com/libp2p/go-libp2p/core/host"
	"github.com/libp2p/go-libp2p/core/network"
	"github.com/libp2p/go-libp2p/core/peer"
	webrtc "github.com/libp2p/go-libp2p/p2p/transport/webrtc"
)

var listenerIp = net.IPv4(127, 0, 0, 1)

func init() {
	ifaces, err := net.Interfaces()
	if err != nil {
		return
	}
	for _, iface := range ifaces {
		if iface.Flags&net.FlagUp == 0 {
			continue
		}
		addrs, err := iface.Addrs()
		if err != nil {
			return
		}
		for _, addr := range addrs {
			// bind to private non-loopback ip
			if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() && ipnet.IP.IsPrivate() {
				if ipnet.IP.To4() != nil {
					listenerIp = ipnet.IP.To4()
					return
				}
			}
		}
	}
}

func echoHandler(stream network.Stream) {
	for {
		reader := bufio.NewReader(stream)
		str, err := reader.ReadString('\n')
		log.Printf("err: %s", err)
		if err != nil {
			return
		}
		log.Printf("-----------------")
		log.Printf("echo: %s", str)

		// if str is ping send pong
		if str == "ping\n" {
			log.Printf("ping received")
			_, err = stream.Write([]byte("pong\n"))
			if err != nil {
				log.Printf("err: %v", err)
				return
			}
			continue
		}

		// Decode the JSON to the interface.
		// var jsonMap map[string]interface{}
		// json.Unmarshal([]byte(str ), &jsonMap)
		// fmt.Println(jsonMap) 
		inputjson, _ := json.Marshal(str)
		fmt.Println(string(inputjson))

		
		_, err = stream.Write([]byte("Bacalhau : Running Job "))// + match[1] + "\n"))
		if err != nil {
			log.Printf("err: %v", err)
			return
		}

		// Running the command
		cmd := exec.Command("bacalhau", "docker", "run", "ubuntu", "echo", "Hello World", "--download")
	
		var out bytes.Buffer
		cmd.Stdout = &out
		
		cmderr := cmd.Run()
		if cmderr != nil {
			log.Printf("cmderr: %v", cmderr)
		}
		// fmt.Printf("translated phrase: %q\n", out.String())
	
		// Extracting Job ID : from out.String()
		re := regexp.MustCompile(`Job ID: (\w+-\w+-\w+-\w+-\w+)`)
		match := re.FindStringSubmatch(out.String())
	
		if len(match) > 0 {
			fmt.Println("Job ID:", match[1])
		} else {
			fmt.Println("Job ID not found")
		}

		splitUUID := strings.Split(match[1], "-")
		dat, err := os.ReadFile("job-"+splitUUID[0]+"/"+"stdout")
		if err != nil {
			panic(err)
		}
		log.Printf("File Output : %v", string(dat))
		_, err = stream.Write([]byte("@"+string(dat)))
		// _, err = stream.Write([]byte("{'output' : '" + string(dat) + "'}"))
		if err != nil {
			log.Printf("err: %v", err)
			return
		}
	}
}

func main() {
	host := createHost()
	host.SetStreamHandler("/echo/1.0.0", echoHandler)
	defer host.Close()
	remoteInfo := peer.AddrInfo{
		ID:    host.ID(),
		Addrs: host.Network().ListenAddresses(),
	}

	remoteAddrs, _ := peer.AddrInfoToP2pAddrs(&remoteInfo)
	fmt.Println("p2p addr: ", remoteAddrs[0])

	fmt.Println("press Ctrl+C to quit")
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, syscall.SIGTERM, syscall.SIGINT)
	<-ch
}

func createHost() host.Host {
	h, err := libp2p.New(
		libp2p.Transport(webrtc.New),
		libp2p.ListenAddrStrings(
			fmt.Sprintf("/ip4/%s/udp/0/webrtc-direct", listenerIp),
		),
		libp2p.DisableRelay(),
		libp2p.Ping(true),
	)
	if err != nil {
		panic(err)
	}

	return h
}