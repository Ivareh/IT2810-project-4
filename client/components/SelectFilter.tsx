import React from 'react';
import Select from 'react-select';


const types = [
    {label: 'All', value: ''},
    {label: 'Movies', value: 'Movie'},
    {label: 'TV-shows', value: 'TV Show'},
];

type props = {
    handleSelect: (searchTerm: string) => void
}

/**
 * Contains a select component from react-select which holds filter types used in queries.
 * @param handleSelect  function from parent that handles the selected value.
 */
function SelectFilter({handleSelect}: props) {
    const [selectedOption, setSelectedOption] = React.useState(types[0]);

    const handleChange = (choice: { label: string; value: string; }) => {
        setSelectedOption(choice);
        handleSelect(choice.value);
    }


    return (
        <div id="selectFilterContainer">
            <p tabIndex={0}>Select show type:</p>
            <Select 
                id="selectFilter"
                aria-label='select show type'
                value={selectedOption}
                options={types}
                onChange={(choice) => handleChange(choice as { label: string; value: string; })}
            />


        </div>
    );
}

export default SelectFilter;