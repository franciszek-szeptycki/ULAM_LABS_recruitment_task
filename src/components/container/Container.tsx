import Widget from "../widget/Widget";

const Container = () => {
    const store = ["bitcoin", "eteh"];

    return (
        <main className="container">
            <ul className="container__ul">
                {store.map((item, index) => (
                    <li key={index} className="container__li"><Widget id={item} index={index} /></li>
                ))}
            </ul>
        </main>
    );
};

export default Container;