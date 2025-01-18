import Header from "@/components/Header";
import Footer from "@/components/Footer"
import "@/styles/global.css"

export default function App({Component, pageProps}) {

    return (
        <>
            <Header title={"Blog"}></Header>
            <main className="page">
                {<Component {...pageProps} />}
            </main>
        </>
    );
}
