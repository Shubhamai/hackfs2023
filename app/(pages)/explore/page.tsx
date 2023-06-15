import { Button } from "@/components/ui/button";
import { getDeployments } from "@/utils/Polybase";
import { Star } from "lucide-react";

const Explore = async () => {
  const deployments = await getDeployments();

  return (
    <div>
      <div className="mt-[200px] flex flex-col gap-20 w-[1200px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-100">
            Deployments.
          </h1>

          <h3 className="text-foreground">
            A page to explore all the models.
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {deployments.data.map((deployment, i) => {
            return (
              <div
                key={i}
                className="border-[1px] border-foreground/20 bg-background/50 p-3 rounded-lg flex flex-col gap-3 hover:border-foreground"
              >
                <div className="flex flex-row gap-5 items-center">
                  {/* <Avatar>
                    <AvatarImage
                      src={`https://source.boringavatars.com/beam?${i}`}
                    />
                  </Avatar> */}
                  <div className="flex flex-col gap-[2px]">
                    <h3 className="font-bold">{deployment.data.name}</h3>
                    <h3 className="font-extralight text-sm">
                      {deployment.data.description}
                    </h3>
                  </div>
                  <div className="flex flex-row gap-1 items-center ml-auto">
                   
                   (deployment.data.provider)
                  </div>
                </div>
                <Button
                  className="p-2 w-40 h-8 hover:bg-foreground/5"
                  variant={"outline"}
                  size={"sm"}
                >
                  Add to Favorites
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
