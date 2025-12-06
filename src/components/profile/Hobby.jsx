import './style.scss';

const CAROUSEL_ITEMS = [
    {
        label: 'Architecture Example 1',
        text: 'https://unsplash.com/de/fotos/ein-hohes-gebaude-mit-einer-uhr-an-der-seite-cI09n4yMIYc',
        imageUrl:
            'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MjNfMjQw%2FMDAxNzU1OTIxOTM2Njc5.HQgW7RdSwTD6Y-Ef7MtA8hmHzbWn2UYbC25KE2cTIn4g.MtLn6U2m5HZJNI6GDkDFFP9WXRjzxHEX-h5vxFaIZ0wg.JPEG%2F%25B0%25F8.jpg&type=sc960_832',
    },
    {
        label: 'battleground',
        text: 'https://unsplash.com/de/fotos/ein-sehr-hohes-gebaude-mit-vielen-fenstern-3svDIdPOT6M',
        // imageUrl: '/images/playerunknowns-battlegrounds.avif',
        imageUrl: '/images/hobby1.png',
    },
    {
        label: 'Architecture Example 3',
        text: 'https://unsplash.com/de/fotos/ein-sehr-hohes-gebaude-mit-vielen-fenstern-ivYgEOo7MnQ',
        imageUrl:
            'https://images.unsplash.com/photo-1702298616106-adbe0f447455?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        label: 'Architecture Example 4',
        text: 'https://unsplash.com/de/fotos/weiss-graues-gebaudekonzept-8yOPWMS46CQ',
        imageUrl:
            'https://images.unsplash.com/photo-1565363887713-783cd82d36d2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        label: 'Architecture Example 5',
        text: 'https://unsplash.com/de/fotos/ein-paar-hohe-gebaude-mit-vielen-fenstern-duj9YsiNKvM',
        imageUrl:
            'https://images.unsplash.com/photo-1701025034709-bef78e69d1ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        label: 'Architecture Example 6',
        text: 'https://unsplash.com/de/fotos/die-spiegelung-eines-gebaudes-in-den-fenstern-eines-anderen-gebaudes-QT6ltyDT7UA',
        imageUrl:
            'https://images.unsplash.com/photo-1701824580548-4f285fc0b80a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        label: 'Architecture Example 7',
        text: 'https://unsplash.com/de/fotos/nahaufnahme-des-weissen-gebaudes-tKnda8e9ejM',
        imageUrl:
            'https://images.unsplash.com/photo-1558472306-75b150ac26eb?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        label: 'Architecture Example 8',
        text: 'https://unsplash.com/de/fotos/ein-hohes-gebaude-mit-zwei-balkonen-und-einer-uhr-sYg7bcIodC8',
        imageUrl:
            'https://images.unsplash.com/photo-1713623210045-95d02b35c4a2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        label: 'Architecture Example 9',
        text: 'https://unsplash.com/de/fotos/eine-nahaufnahme-der-seite-eines-gebaudes-VvhIUx1lITA',
        imageUrl:
            'https://images.unsplash.com/photo-1700846968547-ace2dacd5e0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        label: 'Architecture Example 10',
        text: 'https://unsplash.com/de/fotos/eine-wand-aus-metallquadraten-und-quadraten-a_XIDnN6C0Y',
        imageUrl:
            'https://images.unsplash.com/photo-1700846978475-5f4dd936c00a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        label: 'Architecture Example 11',
        text: 'https://unsplash.com/de/fotos/eine-nahaufnahme-einer-metallstruktur-mit-einem-himmelshintergrund-9u9t6gP8R-s',
        imageUrl:
            'https://images.unsplash.com/photo-1707788620837-cd3efcce3ceb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

const Hobby = () => {
    return (
        <section className="hobby">
            <h2 className="hobbies">(hobbies)</h2>

            <div className="carousel">
                {/* 왼쪽 / 오른쪽 회전 방향 버튼 */}
                <div className="carousel-control-button left">
                    <input type="radio" name="carousel-control-input" />
                </div>
                <div className="carousel-control-button right">
                    <input type="radio" name="carousel-control-input" defaultChecked />
                </div>

                <div className="carousel-rotation-direction">
                    <ul
                        className="carousel-item-wrapper"
                        style={{ '--_num-elements': CAROUSEL_ITEMS.length }}
                    >
                        {CAROUSEL_ITEMS.map((item, index) => (
                            <li
                                key={item.label}
                                className="carousel-item"
                                style={{
                                    '--_index': index + 1,
                                    '--_image-url': `url('${item.imageUrl}')`,
                                }}
                            >
                                <img src={item.imageUrl} alt={item.label} />
                            </li>
                        ))}
                        <li className="carousel-ground" />
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Hobby;
