import React, { useState } from 'react'
import { useHistory } from 'react-router'
import './SearchBar.css'

const SearchBar = ({ placeholder, data }) => {
    const history = useHistory()
    const [filteredData, setFilteredData] = useState([])
    const [wordEntered, setWordEntered] = useState("")

    const clearInput = () => {
        setFilteredData([])
        setWordEntered("")
    }

    const toSpot = (id) => {
        history.push(`/spots/${id}`)
        clearInput()
    }

    const handleResults = (e) => {
        const searchWord = e.target.value.toLowerCase()
        setWordEntered(searchWord)
        const newData = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord)
        })
        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newData)
        }
    }

    return (
        <div className='search-bar-container'>
            <div className='search-bar-icon'>
                <i className='fa-solid fa-magnifying-glass'/>
            </div>
            <input
                type='text'
                value={wordEntered}
                className='search-bar'
                placeholder={placeholder}
                onChange={handleResults}
            />
            <div className='search-bar-icon'>
                {wordEntered.length !== 0 && <i onClick={clearInput} id='search-clear-button' className='fa-solid fa-x'></i>}
            </div>
            {filteredData.length !== 0 &&
                <div className='search-bar-results'>
                    {filteredData.map((data) => {
                        let price = data.price
                        let templatePrice = []
                        for (let i = 0; i < price; i++) {
                            templatePrice.push('$')
                        }

                        return (
                            <div className='search-bar-results' onClick={() => toSpot(data.id)}>
                                <div className='search-bar-result-img-container'>
                                    <img className='search-bar-result-img' src={data.previewImage}></img>
                                </div>
                                <div className='search-bar-result-info-container'>
                                    <div className='search-bar-result-name-address'>
                                        {data.name} ({data.city}, {data.state})
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            }
        </div>
    )
}

export default SearchBar
