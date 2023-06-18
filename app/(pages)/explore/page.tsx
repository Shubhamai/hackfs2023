import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDeployments } from "@/utils/Polybase";
import { Star } from "lucide-react";
import Link from "next/link";

const Explore = async () => {
  const deployments = await getDeployments();

  return (
    <div>
      <div className="mt-[200px] flex flex-col gap-20 w-[1200px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground/70 to-foreground">
            Deployments.
          </h1>

          <h3 className="text-foreground">
            A page to explore all of the deployed models.
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {deployments.data.map((deployment, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "border-[1px] h-[200px] border-foreground/20 bg-background/50",
                  "p-3 rounded-lg flex flex-col gap-3 overflow-hidden",
                  "transition-colors hover:border-foreground/30 hover:bg-foreground/5",
                  "hover:shadow-sm hover:shadow-foreground/40"
                )}
              >
                <Link
                  href={`/${deployment.data.id}`}
                  className="flex flex-row gap-3 items-center"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={`https://source.boringavatars.com/beam?${i}`}
                    />
                  </Avatar>
                  <div className="flex flex-col gap-[2px]">
                    <h3 className="font-semibold text-foreground/90 whitespace-pre">
                      {deployment.data.name}
                    </h3>
                  </div>
                  <div className="flex flex-row gap-1 items-center ml-auto text-sm text-foreground/60 whitespace-pre overflow-ellipsis">
                    {deployment.data.provider}
                  </div>
                </Link>

                <h3 className="font-extralight text-sm">
                  {deployment.data.description}
                </h3>

                <div className="mt-auto">
                  <Button
                    className="gap-2 p-2 h-8 hover:bg-foreground/5 border-foreground/30"
                    variant="outline"
                    size="sm"
                  >
                    <Star className="w-4 h-4" /> Favorite
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
