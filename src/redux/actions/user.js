import { INSERT, DELETE } from '../constant'

export const _insert = data =>
    ({
        type: INSERT,
        data
    })

export const _delete = id =>
    ({
        type: DELETE,
        data: id
    })