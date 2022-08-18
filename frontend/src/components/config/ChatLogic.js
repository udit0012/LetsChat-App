export const getSender = (user, users) => {
    const id = users[0]._id === user._id ? users[1] : users[0];
    return id
}

export const isSamesender = (messages, m, i, userId) => {
    if(i===0){
        return m.sender._id!==userId
    }
    return (
        i < messages.length - 1 && i>0 &&
        (messages[i-1].sender._id !== m.sender._id ||
            messages[i - 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    )
}

export const isFirstMessage = (messages, i, userId) => {
    if(i===0){
        return messages[i].sender._id!==userId
    }
    return (
        i === messages.length - 1 &&
        messages[i].sender._id !== messages[i-1].sender._id &&
        messages[i].sender._id &&
        messages[i].sender._id !== userId
    );
};