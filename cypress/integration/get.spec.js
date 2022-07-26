

describe('GET /characters', function () {

    const characters = [
        {
            name: 'Nome 4',
            alias: 'Apelido 4',
            team: [
                'time4.1',
                'time4.2'
            ],
            active: true
        },
        {
            name: 'Nome 5',
            alias: 'Apelido 5',
            team: [
                'time5.1',
                'time5.2'
            ],
            active: true
        },
        {
            name: 'Nome 6',
            alias: 'Apelido 6',
            team: [
                'time6.1',
                'time6.2'
            ],
            active: true
        }
    ]

    before(function () {
        cy.back2ThePast()
        cy.setToken()
        cy.populateCharacters(characters)
    })

    it('deve retornar uma lista de personagens', function () {

        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })

    it('deve buscar personagem por nome', function () {
        cy.searchCharacters('Nome 5').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Apelido 5')
        })
    })
})

describe('GET /characters/id', function () {

    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })

    const nome8 = {
        name: 'Nome 8',
        alias: 'Apelido 8',
        team: ['time 8.1', 'time 8.2'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function () {

        before(function () {
            //todo
            cy.postCharacter(nome8).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve buscar o personagem pelo id', function () {
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(200)
            })
        })
    })

    it('deve retornar 404 ao buscar por id não cadastrado', function(){
        const id = '62d0a9f2fcb24e20660f41ee'
        cy.getCharacterById(id).then(function(response){
            expect(response.status).to.eql(404)
        })

    })

})