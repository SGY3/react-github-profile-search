import React, { useState } from 'react'
import axios from 'axios';
import './GithubSearch.css'
const GithubSearch = () => {
    const [userName, setUserName] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.github.com/users/${userName}`);
            setProfile(response.data);
            setError(null);
        }
        catch (error) {
            setProfile(null);
            setError('User not found');
        }
    }
    return (
        <div className='main-container'>
            <h1 className='main-heading'>Github Profile Detective</h1>
            <form onSubmit={handleSubmit} className='form-search'>
                <input type="text" className='search-input' onChange={(e) => { setUserName(e.target.value) }} value={userName} placeholder='Enter Github username...' />
                <button type='submit' className='search-btn'>Submit</button>
            </form>
            {error && <p className='error-message'>{error}</p>}
            {profile && (
                <div className='profile-container'>
                    <div className='profile-content'>
                        <div className='profile-img'>
                            <img src={profile.avatar_url} alt='Avatar' className='profile-avatar'></img>
                        </div>
                        <div className='profile-details'>
                            <div className='profile-des'>
                                <h2 className='profile-name'>{profile.name}</h2>
                                <p className='profile-created'>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
                            </div>
                            <a href='{profile.html_url}' target='_blank' rel="noreferrer" className='profile-username'>@{profile.login}</a>
                            <p className='profile-bio'>{profile.bio}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GithubSearch
