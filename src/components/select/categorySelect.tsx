import { useEffect } from "react";
import type { IState } from "../../constants/interface";
import { useStore } from "../../store/useStore";

const CategorySelect = () => {
    const categories = useStore((state: IState) => state.categories);

    const getAllCategories = useStore((state: IState) => state.getAllCategories);
    

    useEffect(() => {
        getAllCategories()
    },[])
    return(
        <select value={""} className="w-full px-4 py-2 bg-gray-800 outline-none text-center rounded-2xl text-xl mb-2">
            <option value={""}>Choose Category</option>
            {categories.map(category => (
                <option value={category.id} key={category.id}>{category.name}</option>
            )) }
        </select>
    )
}

export default CategorySelect;