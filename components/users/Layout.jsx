export { Layout };
function Layout({ children }) {
    return (
        <div className=" min-h-screen flex flex-col p-2 ml-6 md:p-4 md:ml-28">
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}