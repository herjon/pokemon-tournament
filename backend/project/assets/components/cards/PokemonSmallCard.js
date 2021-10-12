import React, {useState} from "react";

const PokemonSmallCard = (props) => {

    return (
        <div className=" flex flex-col items-stretch justify-around shadow-lg  rounded-2xl mx-6 w-auto bg-white dark:bg-gray-800 p-4">
            <p className="text-gray-800 dark:text-gray-50 text-xxs font-medium mb-4">
                {props.imageUrl ? <img className="w-16" alt={props.name} src={props.imageUrl}/> : '?'}
            </p>
            <p className="text-gray-800 dark:text-gray-50 text-md font-medium mb-4">
                {props.name ? props.name : '?'}
            </p>
            {props.experience ? (<section className="text-gray-900 dark:text-white text-xxs font-bold">
                {'Base experience:' + props.experience}
                <div className="relative pt-1 w-100">
                    <div className="overflow-hidden h-2 text-xxs rounded bg-purple-200">
                        <div style={{'width': props.experience}}
                             className="shadow-none h-2  text-center whitespace-nowrap text-white justify-center bg-purple-500">
                        </div>
                    </div>
                </div>
            </section>) : (<p>?</p>)}
            {!!props.editMode && (<button className="w-32 bg-red-500 hover:bg-red-400 text-xxs text-white my-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" type={'button'} onClick={props.removeButtonHandler}>Remove</button>)}
        </div>
    );

}

export default PokemonSmallCard;

