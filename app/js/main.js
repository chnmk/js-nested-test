function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

async function buildFolders() {
    fetch('../data/data.json')
        .then((response) => response.json())
        .then((json) => {

            // Replace null with 0:
            json.services.forEach((obj) => {
                if (obj.head === null) {
                    obj.head = 0
                }
            })

            // Sort array:
            json.services.sort((a, b) => a.head - b.head || a.sorthead - b.sorthead);

            // Build a tree:
            json.services.forEach((obj) => {
                
                // Create element with id = obj.id
                const newDiv = document.createElement("div");
                let textNode = obj.name + " (" + obj.price + ")"

                // Add any custom style for nodes:
                /*
                if (obj.price === 0) {
                    textNode = obj.name + ":"
                } else {
                    textNode = obj.name + " (" + obj.price + ")"
                }
                */

                const newContent = document.createTextNode(textNode);
                newDiv.appendChild(newContent);
                newDiv.id = "id" + obj.id
                newDiv.style.marginLeft = "1rem"

                // Add it as child to element obj.head
                const currentDiv = document.getElementById("id" + obj.head)
                currentDiv.appendChild(newDiv)
            })
        });
}

buildFolders()