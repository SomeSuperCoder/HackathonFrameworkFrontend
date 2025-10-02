import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import MainPage from "./participant/MainPage";
import MyTeam from "./participant/MyTeam";
import Cases from "./participant/Cases";

export default function Participant() {
    return (
        <Tabs className="h-screen" defaultValue="main_page">
            <TabsList className="w-screen">
                <TabsTrigger value="main_page">О хакатоне</TabsTrigger>
                <TabsTrigger value="my_team">Моя команда</TabsTrigger>
                <TabsTrigger value="cases">Кейсы</TabsTrigger>
            </TabsList>
            <TabsContent className="h-full" value="main_page">
                <MainPage />
            </TabsContent>
            <TabsContent className="h-full" value="my_team">
                <MyTeam />
            </TabsContent>
            <TabsContent className="h-full" value="cases">
                <Cases />
            </TabsContent>
        </Tabs>
    );
}
