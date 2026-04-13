import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductsTabs = () => {
    return (
        <Tabs defaultValue="tab1">
            <TabsList className="flex w-full mb-6">
                <TabsTrigger className="flex-1 cursor-pointer" defaultChecked={true} value="tab1">
                    Tab 1
                </TabsTrigger>
                <TabsTrigger className="flex-1 cursor-pointer" value="tab2">
                    Tab 2
                </TabsTrigger>
            </TabsList>
            <TabsContent defaultChecked={true} value="tab1">
                Tab 1 Content
            </TabsContent>
            <TabsContent value="tab2">Tab 2 Content</TabsContent>
        </Tabs>
    );
};

export default ProductsTabs;
