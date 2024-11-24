import fs from 'fs'

const searchRelatedInformation = async () => {
    try {
        const jsonString = await fs.promises.readFile('src/lib/service/utils/products.json', 'utf-8')
        return JSON.parse(jsonString)
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            throw new Error(`读取JSON文件失败: ${error.message}`)
        }
        throw error
    }
}

export default searchRelatedInformation
