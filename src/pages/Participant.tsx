import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import MainPage from "./participant/MainPage";
import MyTeam from "./participant/MyTeam";
import Cases from "./participant/Cases";

export default function Participant() {
    return (
        <Tabs defaultValue="main_page">
            <TabsList className="w-screen">
                <TabsTrigger value="main_page">Main page</TabsTrigger>
                <TabsTrigger value="my_team">My Team</TabsTrigger>
                <TabsTrigger value="cases">Cases</TabsTrigger>
            </TabsList>
            <TabsContent value="main_page">
                <MainPage />
            </TabsContent>
            <TabsContent value="my_team">
                <MyTeam />
            </TabsContent>
            <TabsContent value="cases">
                <Cases />
            </TabsContent>
        </Tabs>
    );
}
