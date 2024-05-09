import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter as Router} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import {AppLayout} from "./layouts";
import {Suspense} from "react";
import {Spin} from "antd";


const queryClient = new QueryClient()

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Suspense fallback={<Spin/>}>
                        <AppLayout/>
                    </Suspense>
                </Router>
            </QueryClientProvider>
            <Toaster/>
        </>
    )
}

export default App
