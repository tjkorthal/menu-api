# frozen_string_literal: true

require 'http'

VENDOR_API_URL = 'http://localhost:3000/vendor'

context '/vendor' do
  let(:test_vendor) do
    {
      name: 'Tyler',
      phone: '555-555-5555',
      website: 'example.com',
      email: 'tyler@example.com'
    }
  end
  let(:http) do
    HTTP.basic_auth(user: 'admin', pass: 'admin')
  end

  after(:all) do
    delete_all_vendors
  end

  describe 'POST' do
    it 'creates a vendor' do
      response = http.post(VENDOR_API_URL, json: test_vendor)
      body = JSON.parse(response.body)
      expect(response.code).to eql 201
      expect(body['name']).to be_a String
      expect(body['phone']).to be_a String
      expect(body['website']).to be_a String
      expect(body['email']).to be_a String
      expect(body['id']).to be_an Integer
    end

    it 'rejects an invalid vendor' do
      response = http.post(VENDOR_API_URL)
      expect(response.code).to eql 400
    end
  end

  describe 'GET' do
    it 'gets a vendor' do
      vendor_id = create_vendor(test_vendor)
      response = http.get("#{VENDOR_API_URL}/#{vendor_id}")
      body = JSON.parse(response.body)
      expect(response.code).to eql 200
      expect(body['name']).to eql 'Tyler'
      expect(body['phone']).to eql '555-555-5555'
      expect(body['website']).to eql 'example.com'
      expect(body['email']).to eql 'tyler@example.com'
    end

    it 'cannot find a vendor that does not exist' do
      response = http.get("#{VENDOR_API_URL}/0")
      expect(response.code).to eql 404
    end

    it 'gets all vendors' do
      delete_all_vendors
      ids = 3.times.map { create_vendor(test_vendor) }
      response = http.get(VENDOR_API_URL)
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body).to be_an Array
      expect(body.size).to eql 3
      expect(body.map { |vendor| vendor['id'] }).to eql ids
    end

    it 'accepts a limit' do
      3.times.map { create_vendor(test_vendor) }
      response = http.get("#{VENDOR_API_URL}?limit=2")
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body).to be_an Array
      expect(body.size).to eql 2
    end

    it 'can handle an offset and limit' do
      3.times.map { create_vendor(test_vendor) }
      response = http.get("#{VENDOR_API_URL}?limit=2&offset=1")
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body).to be_an Array
      expect(body.size).to eql 2
    end

    it 'returns to the end of the list when limit is greater than the number of vendors' do
      3.times.map { create_vendor(test_vendor) }
      number_of_vendors = JSON.parse(http.get(VENDOR_API_URL)).size
      response = http.get("#{VENDOR_API_URL}?limit=#{number_of_vendors + 1}&offset=1")
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body).to be_an Array
      expect(body.size).to eql number_of_vendors - 1
    end

    it 'returns an empty array when given an invalid offset' do
      delete_all_vendors
      3.times.map { create_vendor(test_vendor) }
      response = http.get("#{VENDOR_API_URL}?offset=4")
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body).to be_an Array
      expect(body).to be_empty
    end
  end

  describe 'PATCH' do
    it 'updates a vendor' do
      vendor_id = create_vendor(test_vendor)
      response = http.patch("#{VENDOR_API_URL}/#{vendor_id}", json: { name: 'Leroy Jenkins' })
      expect(response.code).to eql 200
      expect(JSON.parse(response)['name']).to eql 'Leroy Jenkins'
    end

    it 'cannot update a vendor with invalid attributes' do
      vendor_id = create_vendor(test_vendor)
      response = http.patch("#{VENDOR_API_URL}/#{vendor_id}", json: { name: nil })
      expect(response.code).to eql 400
    end

    it 'cannot update a vendor that does not exist' do
      response = http.patch("#{VENDOR_API_URL}/0", json: { name: 'Leroy Jenkins' })
      expect(response.code).to eql 404
    end
  end

  describe 'DELETE' do
    it 'deletes a vendor' do
      vendor_id = create_vendor(test_vendor)
      response = http.delete("#{VENDOR_API_URL}/#{vendor_id}")
      expect(response.code).to eql 200
      body = JSON.parse(response.body)
      expect(body['name']).to eql 'Tyler'
      expect(body['phone']).to eql '555-555-5555'
      expect(body['website']).to eql 'example.com'
      expect(body['email']).to eql 'tyler@example.com'
    end

    it 'cannot delete a vendor that does not exist' do
      response = http.delete("#{VENDOR_API_URL}/0")
      expect(response.code).to eql 404
    end
  end

  def create_vendor(attributes)
    response = http.post(VENDOR_API_URL, json: attributes)
    body = JSON.parse(response.body)
    body['id']
  end

  def delete_all_vendors
    http = HTTP.basic_auth(user: 'admin', pass: 'admin')
    response = http.get(VENDOR_API_URL)
    vendors = JSON.parse(response.body)
    vendors.each { |vendor| http.delete("#{VENDOR_API_URL}/#{vendor['id']}") }
  end
end
