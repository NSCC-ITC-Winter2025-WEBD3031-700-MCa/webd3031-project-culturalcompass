"use client";
import { useState, ChangeEvent } from 'react';
import { Location_Filter } from '@/app/api/data';
import FilterModal from '@/components/Tours/FilterModal';

interface LocationFilterItem {
    lable: string; // Ensure this matches the data structure
}

const Filter = () => {
    const [price, setPrice] = useState<number>(375);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value));
    };

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

    return (
        <>
            <button
                className="lg:hidden bg-primary text-white p-3 rounded-lg"
                onClick={toggleModal}
            >
                Filter
            </button>
            <div className="hidden lg:flex flex-col gap-9">
                <div className="py-11 px-8 shadow-filter_shadow dark:shadow-darkmd rounded-xl dark:bg-darkmode">
                    <h3 className="text-2xl font-bold text-midnight_text mb-6">Price</h3>
                    <form>
                        <label htmlFor="price" className="text-grey text-base">${price} - $750</label>
                        <input
                            type="range"
                            name="price"
                            id="price"
                            min={0}
                            max={750}
                            value={price}
                            onChange={handleRangeChange}
                            className="w-full h-1"
                        />
                    </form>
                </div>
                <div className="py-11 px-8 shadow-filter_shadow dark:shadow-darkmd rounded-xl dark:bg-darkmode">
                    <h3 className="text-2xl font-bold text-midnight_text mb-6">Booking Locations</h3>
                    <form className='flex flex-col gap-4'>
                        {Location_Filter.map((item: LocationFilterItem, index: number) => (
                            <div key={index} className="flex gap-4 items-center checkbox">
                                <input
                                    type="checkbox"
                                    name={item.lable}
                                    id={item.lable}
                                    className=''
                                />
                                <label
                                    htmlFor={item.lable}
                                    className='text-grey text-base'
                                >
                                    {item.lable}
                                </label>
                            </div>
                        ))}
                    </form>
                </div>
            </div>

            <FilterModal isOpen={isModalOpen} onClose={toggleModal}>
                <div className="flex flex-col">
                    <div className="py-11 px-8 shadow-filter_shadow rounded-xl">
                        <h3 className="text-2xl font-bold text-midnight_text mb-6">Price</h3>
                        <form>
                            <label htmlFor="price" className="text-grey text-base">${price} - $750</label>
                            <input
                                type="range"
                                name="price"
                                id="price"
                                min={0}
                                max={750}
                                value={price}
                                onChange={handleRangeChange}
                                className="w-full h-1"
                            />
                        </form>
                    </div>
                    <div className="py-11 pt-0 px-8 shadow-filter_shadow rounded-xl">
                        <h3 className="text-2xl font-bold text-midnight_text mb-6">Booking Locations</h3>
                        <form className='flex flex-col gap-4'>
                            {Location_Filter.map((item: LocationFilterItem, index: number) => (
                                <div key={index} className="flex gap-4">
                                    <input
                                        type="checkbox"
                                        name={item.lable}
                                        id={item.lable}
                                    />
                                    <label
                                        htmlFor={item.lable}
                                        className='text-grey text-base'
                                    >
                                        {item.lable}
                                    </label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            </FilterModal>
        </>
    );
};

export default Filter;
