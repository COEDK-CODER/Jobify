import bcrypt from 'bcryptjs'
export async function hashPassword(password)
{
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    return hashedPassword;
}

export async function comparePassword(userPassword,orgPassword){
    const isMatch=  await bcrypt.compare(userPassword, orgPassword);
    return isMatch;
}