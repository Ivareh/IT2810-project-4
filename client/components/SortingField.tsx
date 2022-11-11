import React from 'react';
import Select from 'react-select';


interface props {
    getSortType: (sortTerm: string) => void;
}

const types = [
    {label: 'Release Year newest-oldest', value: 'DESC'},
    {label: 'Release Year oldest-newest', value: 'ASC'},
];


/**
 * SortingField component which is used to sort the search results.
 * @param getSortType function that passes value from this component to the
 * parent.
 */
export function SortingField({getSortType}: props) {
    const [selectedOption, setSelectedOption] = React.useState(types[0]);

    const handleChange = (choice: { label: string; value: string; }) => {
        setSelectedOption(choice);
        getSortType(choice.value);
    }

    return (
        <div id="sortingContainer">
            <p tabIndex={0}>Sort by: </p>
            <Select 
                data-testid={"sort-release-year"}
                id="sortFilter"
                aria-label='sort shows'
                value={selectedOption}
                options={types}
                onChange={(choice) => handleChange(choice as { label: string; value: string; })}
            />

        </div>
    )
}

export default SortingField