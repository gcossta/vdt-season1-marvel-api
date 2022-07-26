
describe('DELETE /characters/id', function () {

    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })

    const nome9 = {
        name: 'Nome 9',
        alias: 'Apelido 9',
        team: ['time 9.1', 'time 9.2'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.postCharacter(nome9).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve remover o personagem pelo id', function () {
            const id = Cypress.env('characterId')
            cy.deleteCharacterById(id).then(function (response) {
                expect(response.status).to.eql(204)
            })
        })

        after(function () {
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })

    it('deve retornar 404 ao remover por id não cadastrado', function () {
        const id = '62d0a9f2fcb24e20660f41ee'
        cy.deleteCharacterById(id).then(function (response) {
            expect(response.status).to.eql(404)
        })

    })

})