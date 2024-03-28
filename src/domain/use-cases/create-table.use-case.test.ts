import {CreateTable} from './create-table.use-case'

describe('create-table.use-case', () => {
    test('should have the correct instance', () => {
        const createTable = new CreateTable();
        expect(createTable).toBeInstanceOf(CreateTable)
    })
    
    test('should create table with default values', () => {
        const createTable = new CreateTable();

        const defaultValues = {
            base: 3,
            limit: 20
        }

        const table = createTable.execute(defaultValues)
        const rows = table.split('\n').length

        expect(table).toContain('3 x 3 = 9')
        expect(table).toContain('3 x 10 = 30')
        expect(table).toContain('3 x 15 = 45')

        expect(rows).toBe(defaultValues.limit)
    })
})