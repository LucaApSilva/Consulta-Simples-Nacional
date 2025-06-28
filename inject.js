const inputCnpj = document.querySelector('.input__cnpj')
const search = document.querySelector('.button')
const body = document.querySelector('body')
const spinner = document.getElementById('spinner')

search.addEventListener('click', async () => {

    const value = inputCnpj.value

    spinner.classList.remove('hidden')
    search.classList.add('hidden__button')

    if (!value) {
        console.log('informe os cnpjs')

        return
    }
    try {

        const response = await fetch('http://localhost:3000/search-cnpj', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cnpjs: value })
        })

        const data = await response.json()

        const list = document.createElement('div')
        list.className = 'list__cnpjs'

        if (data.length > 1) {
            for (const item of data) {
                console.log(data)
                const li = document.createElement("li")
                li.textContent = `Cnpj: ${item.Cnpj} SimplesNacional: ${item.SimplesNacional}`
                list.appendChild(li)
            }

        } else {

            const li = document.createElement("li")
            li.textContent = `Cnpj: ${data.cnpj} SimplesNacional: ${data.simplesNacional}`
            list.appendChild(li)
        }

        body.appendChild(list)


    } catch (error) {

        console.log('aconteceu algum erro kkk')
        console.log(error)

    } finally {
        spinner.classList.add('hidden')
        search.classList.remove('hidden__button')
    }


})