import Header from "@/components/Header";
import Footer from "@/components/Footer"
import "./_app.css";

export default function App({Component, pageProps}) {

    return (
        <>
            <Header title={"Blog"}></Header>
            <main className="page">
                {<Component {...pageProps} />}
            </main>
            <Footer></Footer>
        </>
    );
}
