import Content from "./components/Content/Content";
import Header from "./header";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto w-full h-full">
      <Header />
      <Content />
    </div>
  );
}
