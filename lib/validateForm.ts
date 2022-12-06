interface InputProps {
    name: string,
    agree: boolean,
    id: string,
    sector: {main: string, sub: string}
}
export const validateForm = (inputs: InputProps) => {
    const { name, sector, agree } = inputs
    if (!name) {
        const msg ="Enter name"
        return {msg}
    }
    
    if (!sector?.main) {
        const msg ="Select sector"
        return {msg}
    }
    
    if (!agree) {
        const msg ="Agree to terms"
        return {msg}
    }
}