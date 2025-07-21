const inputCnpj = document.querySelector('.input__cnpj')
const search = document.querySelector('.button')
const body = document.querySelector('body')
const spinner = document.getElementById('spinner')
const container = document.querySelector('.container')
let list = document.querySelector('.list__cnpjs')

search.addEventListener('click', async () => {

    const value = inputCnpj.value

    spinner.classList.remove('hidden')
    search.classList.add('hidden__button')

    try {

        if (!value) {
            console.log('informe os cnpjs')

            alert('Informe o CNPJ!')

            return
        }

        const validation = /\W|_|[A-z]/

        if (validation.test(value) | value.length < 14) {

            alert('Dados incorretos!')

            return
        }

        if (list) {

            list.remove()

            list = null
        }

        const response = await fetch('http://localhost:3000/search-cnpj', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cnpjs: value })
        })

        const data = await response.json()

        list = document.createElement('div')
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

        container.appendChild(list)


    } catch (error) {

        console.log('aconteceu algum erro kkk')
        console.log(error)

    } finally {
        spinner.classList.add('hidden')
        search.classList.remove('hidden__button')
    }


})