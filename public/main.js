var update = document.getElementById('update')
var del = document.getElementById('delete')
update.addEventListener('click', function () {
    // Send PUT Request here
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Darth Vader',
            'quote': 'I find your lack of faith disturbing.'
        })
    }).then(function (res) {
        if(res.ok) return res.json()
        
    }).then(function (data) {
        console.log(data)
        window.location.reload(true)
    })
})

del.addEventListener('click', function () {
    fetch('quotes', {
        method: 'delete',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            'name' : 'Darth Vader'
        })
    }).then(function (res) {
        if (res.ok) return res.json()
    }).then(function (data) {
        console.log(data)
        window.location.reload(true)
    })

})