import './style.scss';
import projects from '../../../api/projects';

const ListView = () => {
    return (
        <div className="listView">
            <p className="filter">
                <button className="on">ALL</button>
                <button>TEAM</button>
                <button>INDIVIDUAL</button>
                <button>CLONE</button>
            </p>
            <ul className="list">
                {projects.map((prj) => (
                    <li key={prj.id}>
                        <div className="thum-img">
                            <img src={prj.thumImg} alt={prj.title} />
                        </div>
                        <div className="title-text">
                            <ul>
                                {prj.tools.map((tls, index) => (
                                    <li key={index}>{tls}</li>
                                ))}
                            </ul>
                            <h4>{prj.title}</h4>
                            <div className="type">
                                <dl>
                                    <dt>TYPE</dt>
                                    <dd>{prj.type}</dd>
                                </dl>
                                <dl>
                                    <dt>LAYOUT</dt>
                                    <dd>{prj.layout}</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="links-btns">
                            <p>
                                <a href={prj.links.web}>web page</a>
                            </p>
                            <p>
                                <a href={prj.links.github}>github</a>
                            </p>
                            <p>
                                <a href={prj.links.figma}>figma</a>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListView;
