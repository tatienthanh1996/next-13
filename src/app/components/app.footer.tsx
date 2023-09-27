"use client"
import Link from "next/link";
import useSWR from "swr";


const AppFooter = () => {
    const fetcher = (url: string) => fetch(url).then((r) => r.json());

    const {
        data: dataMenu,
        error: error,
        isLoading: isLoading,
    } = useSWR(`https://beta.odecompany.com/wp-json/api/v1/menu`, fetcher);

    const {
        data: dataFooter,
        error: error2,
        isLoading: isLoading2,
    } = useSWR(`https://beta.odecompany.com/wp-json/api/v1/footer`, fetcher);


    if (error || error2) return <div>Data failed</div>;
    if (isLoading || isLoading2)
        return (
            <div className="loading">
                <div className="loader"></div>
            </div>
        );

    const newData = dataMenu.filter(function (menu: {
        cat: any;
        url: any;
        post_parent: string;
    }) {
        if (menu.post_parent == "0") {
            menu.cat = menu.url.split("/");
            return true;
        }
        return false;
    });

    console.log(dataFooter);

    function Block_logo() {
        const sanitizedHTML = dataFooter.block_logo;
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </>
        );
    }

    function Block_address() {
        const sanitizedHTML = dataFooter.block_address;
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </>
        );
    }

    function Block_contact() {
        const sanitizedHTML = dataFooter.block_contact;
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </>
        );
    }

    function Block_info() {
        const sanitizedHTML = dataFooter.block_info;
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </>
        );
    }

    return (
        <footer>
            <div className="menu-footer bg-[#A83426] max-[768px]:hidden">
                <ul className="nav-menu m-0 p-0 flex justify-center h-full items-center">
                    {newData.map((menu: any) => {
                        return (
                            <li
                                key={menu.ID}
                                className={`${menu.classes[0] !== ""
                                    ? menu.classes[0]
                                    : "hover:bg-[#540202]"
                                    } menu-item p-[15px] relative h-full`}
                            >
                                <Link
                                    href={
                                        menu.cat[4] !== undefined
                                            ? `/category/${menu.cat[4]}`
                                            : "/"
                                    }
                                    className="text-[#fff] text-[14px] uppercase font-bold"
                                >
                                    {menu.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="content-footer px-[10%] mx-auto flex flex-wrap justify-between py-[30px] max-[768px]:p-[15px]">
                <div className="logo w-[15%] max-[768px]:w-full max-[768px]:mb-[20px]">
                    <Block_logo />
                </div>
                <div className="address w-[35%] max-[768px]:w-full max-[768px]:mb-[20px]">
                    <Block_address />
                </div>
                <div className="contact w-[20%] max-[768px]:w-full max-[768px]:mb-[20px]">
                    <Block_contact />
                </div>
                <div className="info w-[25%] max-[768px]:w-full max-[768px]:mb-[20px]">
                    <Block_info />
                </div>
            </div>

            <div className="policy px-[10%] bg-[#ddd] py-[5px]">
                <Link href={dataFooter.chinh_sach.link}>
                    {dataFooter.chinh_sach.text}
                </Link>
            </div>
        </footer>
    )
}

export default AppFooter;