import React, { useState } from "react";
import PageContainer from "~/hoc/PageContainer";
import { STATIC_IMG_DIR } from "common/utils/vars";
import styles from "./AboutUs.module.scss";
import LazyImg from "../shared/Lazyload/LazyLoad";

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeAccordion, setActiveAccordion] = useState(0);

    const handleAccordionClick = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
        const section = document.getElementById("aboutus");
        section.scrollIntoView({ behavior: "smooth" });
    };
    const tabs = [
        {
            title: "History",
            imgPath: "/ceo.png",
            imgName: "John Glucksman: CEO of Quake City Caps",
            content: (
                <div className="historyTab cmnTab">
                    <div className="upperbox">
                        <p>Established in 1977 Quake City Caps emerged from a desire to inject creativity into the headwear industry. Recognizing a void in the market, Quake City Caps embarked on a journey to craft distinctive headwear that resonated with individuality and style.</p>
                        <p>The company began as a modest domestic enterprise. However, in 1998, we made the strategic decision to expand globally. Through meticulous exploration, we forged partnerships with overseas companies capable of replicating our domestic creativity using the same fabrics, designs, and machinery. These collaborations enabled a seamless transition from domestic to international production, a process spanning five years. Today, we proudly operate with a 100% overseas manufacturing model, a testament to our commitment to innovation and growth.</p>
                        <p>
                            Our journey from a local enterprise to a global player has been marked by unwavering dedication to our core values: creativity, quality, and customer satisfaction. With each step, we have embraced challenges as opportunities for growth, always pushing the boundaries of what&#39;s possible in the headwear industry. At Quake City Caps, our passion for innovation drives us forward. We constantly seek out new trends, materials, and techniques to ensure that our products remain at the forefront of style and functionality. Our commitment to quality means that every cap bearing the Quake City name is crafted with precision and care, meeting the highest standards of durability and design. As we look to the future, we are excited by the possibilities that lie ahead. With a global presence and a reputation for excellence, Quake City Caps is poised to continue shaping the headwear industry for years to come. Join us on our journey, and together, let&#39;s make a
                            statement worth wearing.
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "Our Mission",
            imgPath: "/mission.png",
            imgName: "",
            content: (
                <div className="ourMissionTab cmnTab">
                    <div className="upperbox">
                        <p>At Quake City Caps, our mission is clear: to deliver unparalleled quality and contemporary design while upholding the highest standards of ethical and sustainable business practices. We are dedicated to continually scouring the market for emerging trends, seamlessly integrating them into the promotional industry, and offering our clientele the same cutting-edge products found in premier retail stores.</p>
                        <p>Our commitment to excellence extends beyond our products; it encompasses a responsibility to the environment and global security. We actively engage with platforms like EcoVadis to assess and improve our sustainability performance, ensuring that we minimize our environmental footprint and inspire others to prioritize sustainability in their operations.</p>
                        <p>Moreover, we proudly participate in programs like C-TPAT, working closely with U.S. Customs and Border Protection to enhance supply chain security while expediting the speed of delivery and facilitating the movement of legitimate trade. Through these initiatives, we uphold our principles of honesty, integrity, and loyalty, fostering a culture of responsibility towards our employees, clients, and the global community.</p>
                    </div>
                </div>
            )
        },
        {
            title: "Working at QC",
            imgPath: "/qc.png",
            imgName: "",
            content: (
                <div className="workingAtQC cmnTab">
                    <div className="upperbox">
                        <p>Working at Quake City is an opportunity to join a dynamic team dedicated to creativity, innovation, and excellence. We celebrate diversity and strive to create an inclusive environment where every voice is valued. Our founder, John Glucksman, maintains an open-door policy, welcoming all employees to share their ideas and feedback directly with him. At Quake City, our culture is built on mutual respect, collaboration, and a shared passion for our craft.</p>
                    </div>
                </div>
            )
        },
        {
            title: "Community",
            imgPath: "/community.png",
            imgName: "",
            content: (
                <div className="communityTab cmnTab">
                    <div className="upperbox">
                        <p>At Quake City, we believe in giving back to the communities that support us. We are deeply committed to making a positive impact on society by supporting causes that align with our values of inclusivity, diversity, and social responsibility. Through various philanthropic endeavors, we strive to uplift and empower individuals and groups in need.</p>
                        <p>We are proud to support youth programs for homeless children, providing essential resources and opportunities for education, shelter, and growth. By investing in the future of these young individuals, we aim to break the cycle of homelessness and create pathways to a brighter future.</p>
                        <p>Additionally, we are dedicated to supporting research and advocacy efforts in the fight against diseases such as Alzheimer&#39;s and cancer. Through our contributions, we hope to advance medical research, improve patient care, and ultimately find cures for these devastating illnesses.</p>
                        <p>Furthermore, we are committed to nurturing the next generation of leaders and innovators through our sponsorship of the UCLA architecture scholarship program. By providing financial assistance to aspiring students pursuing their academic and professional goals in architecture, we aim to foster creativity, diversity, and excellence in the field.</p>
                        <p>At Quake City, giving back is an integral part of who we are. We are honoured to be able to make a positive difference in the lives of others and are excited about the future possibilities that lie ahead. Join us on this journey as we continue to push the boundaries of creativity and redefine what it means to be a leader in the headwear industry.</p>
                    </div>
                </div>
            )
        }
    ];
    return (
        <section className={`${styles.AboutUs} bg-white section_padding_top`}>
            <PageContainer fluid={true} id="aboutus">
                <div className="title-main-wrapper">
                    <div className="list-title">
                        <h3 className="title">About us</h3>
                    </div>
                </div>
                <div className="about_sec">
                    <div className="col-md-12">
                        <ul className="tabsName d-none d-md-flex">
                            {tabs.map((tab, index) => (
                                <li key={tab.title} className={index === activeTab ? "active" : ""} onClick={() => setActiveTab(index)}>
                                    <span> {tab.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="tabContent col-md-12  d-none d-md-block">
                        {tabs.map((tab, index) => (
                            <div key={tab.title} className={` ${index === activeTab ? "active" : "inactive"}`}>
                                {tab?.imgPath !== "" && (
                                    <div className="col-md-12 col-lg-6 about-img p-0">
                                        <LazyImg src={`${STATIC_IMG_DIR}${tab.imgPath}`} />
                                        <div className="imgName">{tab?.imgName}</div>
                                    </div>
                                )}
                                <div className="col-md-12 col-lg-6 textWrap">{tab.content}</div>
                            </div>
                        ))}
                    </div>
                    <div className="accordion d-md-none">
                        {tabs.map((tab, index) => (
                            <div key={tab.title} className={`accordion-item ${index === activeAccordion ? "active" : ""}`}>
                                <div className="accordion-header" onClick={() => handleAccordionClick(index)}>
                                    <h5>{tab.title}</h5>
                                </div>
                                <div className={`accordion-content ${activeAccordion === index ? "active" : "inactive"}`}>
                                    {tab?.imgPath !== "" && (
                                        <div className="about-img">
                                            <LazyImg src={`${STATIC_IMG_DIR}${tab.imgPath}`} />
                                            <div className="imgName">{tab?.imgName}</div>
                                        </div>
                                    )}
                                    <div className="textWrap">{tab.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PageContainer>
        </section>
    );
};

export default AboutUs;
