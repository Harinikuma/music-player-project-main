import React, { useState } from 'react';

const PlaylistItem = ({ name, image, onClick }) => {
    return (
        <div onClick={onClick} className="list-item">
            <p>{name}</p>
            <img src={image} alt={name} />
        </div>
    );
};

function Songs() {
    const [selectedItem, setSelectedItem] = useState(null);

    const list = [
        { id: 1, name: "Vennilavae", image: "minsara.jpg", content: "Content for Vennilavae" },
        { id: 2, name: "Pachai nirame", image: "alai.jpg", content: "Content for Pachai nirame" },
        { id: 3, name: "Thanga Thamarai", image: "minsara.jpg", content: "Content for Thanga Thamarai" },
        { id: 4, name: "Endrendrum Punagai", image: "image4.jpg", content: "Content for Endrendrum Punagai" },
        { id: 5, name: "Snehithanae", image: "image5.jpg", content: "Content for Snehithanae" }
    ];

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="container">
            <div className="left-panel">
                <div className="s-left-body">
                    <a href="index.html"><img src="back.png" alt="" className="back-button" /></a>
                    <h1 className="title">90s Playlists</h1>
                    <p className="description">"90s Tamil playlists" are curated collections of Tamil music from the 1990s, offering a nostalgic journey through the era's diverse musical landscape.</p>
                    <hr />
                    <h3>Lists</h3>
                    {list.map(item => (
                        <PlaylistItem key={item.id} name={item.name} image={item.image} onClick={() => handleItemClick(item)} />
                    ))}
                </div>
            </div>
            <div className="right-panel">
                {selectedItem && (
                    <div className="selected-item">
                        <h2>{selectedItem.name}</h2>
                        <img src={selectedItem.image} alt={selectedItem.name} />
                        <p>{selectedItem.content}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Songs;
