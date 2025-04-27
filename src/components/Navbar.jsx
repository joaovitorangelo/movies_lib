import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiSearchAlt2 } from "react-icons/bi"
import { GiBee } from "react-icons/gi"
import { HiFolderDownload } from "react-icons/hi";
import { CiLogin } from "react-icons/ci";
import { BiSolidCameraMovie } from "react-icons/bi";

import "./Navbar.css"

const Navbar = () => {

    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(!search) return

        navigate(`/search?q=${search}`)
        setSearch("")
    }

    return (
        <nav id="navbar">
            <div className="navigation">
                <h2>
                    <Link to="/">
                        <GiBee /> <span>BeeMoovies</span>
                    </Link>
                </h2>
                <h2 className="up">
                    <Link to="uploadmovie">
                        <HiFolderDownload /> <span>Upload</span>
                    </Link>
                </h2>
                <h2>
                    <Link to="login">
                        <CiLogin /> <span>Acesso</span>
                    </Link>
                </h2>
                <h2>
                    <Link to="sortear-filmes">
                        <BiSolidCameraMovie /> <span>Sortear</span>
                    </Link>
                </h2>
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Search" 
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                />
                <button type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>
        </nav>
    )
}

export default Navbar