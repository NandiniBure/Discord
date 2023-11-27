import { Menu } from "lucide-react"
import {
   Sheet,
   SheetContent,
   SheetTrigger
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import NavigationSideabar from "./Navigation/NavigationSideabar"
import { ServerSidebar } from "./server/serverSidebar"
export const MobileToggle=({
    serverId
}:{
    serverId:string
})=>{
    return(
     
        <Sheet>
            <SheetTrigger asChild >
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className=" p-0 flex gap-0">
           <div className="w-[72px]">
            <NavigationSideabar/>
           </div>
           <ServerSidebar
           serverId={serverId}
           />
            </SheetContent>
        </Sheet>
    )
}