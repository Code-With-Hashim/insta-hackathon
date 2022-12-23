import styles from "../styles/Profile.module.css"
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { CiSaveDown2 } from "react-icons/ci";
import { FaUserTag } from "react-icons/fa";
import Image from 'next/image'
import { useEffect, useState } from "react"
import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiNjNhNDZhNmU4ZDU5MWZkNGRjYzE1ZDlmIiwidXNlcm5hbWUiOiJBcnVuIFNpbmdoIiwiaWF0IjoxNjcxNzE5NjQxfQ.gXyv7QVn1h9iWXWmy-h4_hzEObb76TFLh2YSfXwnLkY"

const Profile = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/users", {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            console.log(res.data)
        })
    }, []);
    
    return (
        <>

            <div className={styles.ProfileMainDiv}>

                <div className={styles.ProfilepicDiv}>
                    <div className={styles.ProfilepicDiv_1}>
                        <div className={styles.profileImage}>
                            <Image className={styles.userImage}
                                src="https://instagram.fcgk4-2.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?efg=eyJybWQiOiJpZ19hbmRyb2lkX21vYmlsZV9uZXR3b3JrX3N0YWNrX3RpZ29uX21uc18yNTlfcmJzX3Y1OnRpZ29uX2xpZ2VyIn0&_nc_ht=instagram.fcgk4-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=9VM04BTIGh4AX8_9sNN&edm=AA0lj5EBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfCFggsRiB_gCIkA6GPST0U_K102fhSy37HO9v6JANJK6g&oe=63AA550F&_nc_sid=3add00"
                                alt="Picture of the user"
                                width="190"
                                height="170"
                            />

                        </div>
                        <div className={styles.userDetails}>
                            <div className={styles.userIDDiv}>
                                <h2>ar.unsingh303</h2>
                                {/* {posts.map((elm) => {
                                    return (
                                        <div key={elm._id}>
                                            <h3>{elm._id}</h3>
                                            <h2>{elm.username}</h2>
                                        </div>
                                    )
                                })} */}
                            </div>
                            <div className={styles.postFollowerDiv}></div>
                            <h3>ARUN SINGH</h3>
                        </div>
                    </div>
                </div>
                <hr className={styles.horizontalLine} />

                <div className={styles.postsavetagged}>

                    <div className={styles.iconsButton}> <BsGrid3X3GapFill />
                        <button>POSTS</button>
                    </div>
                    <div className={styles.iconsButton}><CiSaveDown2 />
                        <button>SAVED</button>
                    </div>
                    <div className={styles.iconsButton}><FaUserTag />
                        <button>TAGGED</button>
                    </div>

                </div>

                <div className={styles.GettingStarted}>
                    <div className={styles.GettingStarted}>
                        <p style={{ color: "#000000", fontSize: "16px", fontWeight: "bold" }}>Getting Started</p>


                    </div>

                </div>

                <div className={styles.social}>
                    <a href="">Meta</a >
                    <a href="">About</a >
                    <a href="">Blog</a >
                    <a href="">Jobs</a >
                    <a href="">API</a >
                    <a href="">Help</a >
                    <a href="">Privacy</a >
                    <a href="">Terms</a >
                    <a href="">Top Accounts</a >
                    <a href="">Locations</a >
                    <a href="">Instagram Lite</a >
                    <a href="">Contact Uploading & Non-Users</a >
                </div>
                <div className={styles.reservedright}>
                    <select className={styles.select}>
                        <option>English</option>
                        <option>हिंदी</option>
                        <option>ಕನ್ನಡ</option>
                        <option>ગુજરાતી</option>
                        <option>മലയാളം</option>
                        <option>ଓଡିଆ</option>
                        <option>தமிழ்</option>
                        <option>ਪੰਜਾਬੀ</option>
                        <option>Dutch</option>
                        <option>Franch</option>
                    </select>
                    <p style={{ marginTop: "1.5px" }}>© 2022 Instagram from Meta</p>
                </div>


            </div>


        </>
    )
}

export default Profile
