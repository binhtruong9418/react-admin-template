import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter as Router} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import {AppLayout} from "./layouts";


const queryClient = new QueryClient()
function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <AppLayout/>
                </Router>
            </QueryClientProvider>
            <Toaster/>
        </>
    )
}

export default App
