# frozen_string_literal: true

require 'http'

context '/vendor' do
  let(:api_url) { 'http://localhost:3000/vendor' }
  let(:test_vendor) do
    {
      name: 'Tyler',
      phone: '555-555-5555',
      website: 'example.com',
      email: 'tyler@example.com'
    }
  end
  let(:auth) do
    { user: 'admin', pass: 'admin' }
  end
  let(:http) do
    HTTP.basic_auth(auth)
  end

  describe 'POST' do
    it 'creates a vendor' do
      response = http.post(api_url, json: test_vendor)
      body = JSON.parse(response.body)
      expect(response.code).to eql 201
      expect(body['name']).to be_a String
      expect(body['phone']).to be_a String
      expect(body['website']).to be_a String
      expect(body['email']).to be_a String
      expect(body['id']).to be_an Integer
    end

    it 'rejects an invalid vendor' do
      response = http.post(api_url)
      expect(response.code).to eql 400
    end
  end

  describe 'GET' do
    it 'gets a vendor' do
      response = http.get("#{api_url}/1")
      body = JSON.parse(response.body)
      expect(response.code).to eql 200
      expect(body['name']).to eql 'Tyler'
      expect(body['phone']).to eql '555-555-5555'
      expect(body['website']).to eql 'example.com'
      expect(body['email']).to eql 'tyler@example.com'
    end

    it 'cannot find a vendor' do
      response = http.get("#{api_url}/9999999999")
      expect(response.code).to eql 404
    end
  end

  describe 'PATCH' do
    it 'updates a vendor'
    it 'cannot update a vendor'
  end

  describe 'DELETE' do
    it 'deletes a vendor' do
      response = http.delete("#{api_url}/1")
      body = JSON.parse(response.body)
      expect(response.code).to eql 200
      test_vendor.each_value do |key, value|
        expect(body[key]).to eql value
      end
    end

    it 'cannot delete a vendor' do
      response = http.delete("#{api_url}/9999999999")
      expect(response.code).to eql 404
    end
  end
end
