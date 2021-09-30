# frozen_string_literal: true

require 'http'

MENU_API_URL = 'http://localhost:3000/menu'

context '/menu' do
  let(:vendor) do
    response = http.post('http://localhost:3000/vendor', json: {
      name: 'Tyler',
      phone: '555-555-5555',
      website: 'example.com',
      email: 'tyler@example.com'
    })
    JSON.parse(response.body)
  end
  let(:test_menu) do
    {
      name: "Tylo's Steakhouse",
      vendorId: vendor['id']
    }
  end
  let(:http) do
    HTTP.basic_auth(user: 'admin', pass: 'admin')
  end

  after(:all) do
    delete_all_menus
  end

  describe 'POST' do
    it 'creates a menu' do
      response = http.post(MENU_API_URL, json: test_menu)
      body = JSON.parse(response.body)
      expect(response.code).to eql 201
      expect(body['name']).to be_a String
      expect(body['id']).to be_an Integer
    end

    it 'rejects an invalid menu' do
      response = http.post(MENU_API_URL)
      expect(response.code).to eql 400
    end
  end

  describe 'GET' do
    it 'gets a menu' do
      menu_id = create_menu(test_menu)
      response = http.get("#{MENU_API_URL}/#{menu_id}")
      body = JSON.parse(response.body)
      expect(response.code).to eql 200
      expect(body['name']).to eql "Tylo's Steakhouse"
    end

    it 'cannot find a menu that does not exist' do
      response = http.get("#{MENU_API_URL}/0")
      expect(response.code).to eql 404
    end

    it 'gets all menus' do
      delete_all_menus
      ids = 3.times.map { create_menu(test_menu) }
      response = http.get(MENU_API_URL)
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body).to be_an Array
      expect(body.size).to eql 3
      expect(body.map { |menu| menu['id'] }).to eql ids
    end

    it 'accepts a limit' do
      3.times.map { create_menu(test_menu) }
      response = http.get("#{MENU_API_URL}?limit=2")
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body).to be_an Array
      expect(body.size).to eql 2
    end

    it 'can handle an offset and limit' do
      3.times.map { create_menu(test_menu) }
      response = http.get("#{MENU_API_URL}?limit=2&offset=1")
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body).to be_an Array
      expect(body.size).to eql 2
    end

    it 'returns to the end of the list when limit is greater than the number of menus' do
      3.times.map { create_menu(test_menu) }
      number_of_menus = JSON.parse(http.get(MENU_API_URL)).size
      response = http.get("#{MENU_API_URL}?limit=#{number_of_menus + 1}&offset=1")
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body).to be_an Array
      expect(body.size).to eql number_of_menus - 1
    end

    it 'returns an empty array when given an invalid offset' do
      delete_all_menus
      3.times.map { create_menu(test_menu) }
      response = http.get("#{MENU_API_URL}?offset=4")
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body).to be_an Array
      expect(body).to be_empty
    end
  end

  describe 'PATCH' do
    it 'updates a menu' do
      menu_id = create_menu(test_menu)
      response = http.patch("#{MENU_API_URL}/#{menu_id}", json: { name: "Ben's Steakhouse" })
      expect(response.code).to eql 200
      expect(JSON.parse(response)['name']).to eql "Ben's Steakhouse"
    end

    it 'cannot update a menu with invalid attributes' do
      menu_id = create_menu(test_menu)
      response = http.patch("#{MENU_API_URL}/#{menu_id}", json: { name: nil })
      expect(response.code).to eql 400
    end

    it 'cannot update a menu that does not exist' do
      response = http.patch("#{MENU_API_URL}/0", json: { name: "Ben's Steakhouse" })
      expect(response.code).to eql 404
    end
  end

  describe 'DELETE' do
    it 'deletes a menu' do
      menu_id = create_menu(test_menu)
      response = http.delete("#{MENU_API_URL}/#{menu_id}")
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body['name']).to eql "Tylo's Steakhouse"
    end

    it 'cannot delete a menu that does not exist' do
      response = http.delete("#{MENU_API_URL}/0")
      expect(response.code).to eql 404
    end
  end

  def create_menu(attributes)
    response = http.post(MENU_API_URL, json: attributes)
    body = JSON.parse(response.body)
    body['id']
  end

  def delete_all_menus
    http = HTTP.basic_auth(user: 'admin', pass: 'admin')
    response = http.get(MENU_API_URL)
    menus = JSON.parse(response.body)
    menus.each { |menu| http.delete("#{MENU_API_URL}/#{menu['id']}") }
  end
end
