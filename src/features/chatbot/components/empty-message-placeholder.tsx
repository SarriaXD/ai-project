import { Dog } from 'public/icons'

const EmptyMessagePlaceholder = () => {
    return (
        <div className="size-full flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-60 md:max-w-96">
                <Dog className="mx-auto aspect-square text-white size-32 md:size-48" />
                <p className="mx-auto mt-8 text-center text-gray-300 md:text-xl">
                    Hi! I am a shopping assistant who can help make your purchasing decisions easier.
                </p>
            </div>
        </div>
    )
}

export default EmptyMessagePlaceholder
