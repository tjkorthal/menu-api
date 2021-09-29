# Menu API

An API for managing vendors and menus.

## Usage

* Running the API: `npm run serve`
* Running the API in debug mode: `npm run debug`
* Run the tests: `npm run test`

## Integration tests

Integration tests are written in Ruby using the Rspec gem.

(Assuming Ruby is installed)

1. Navigate to the `tests/integration` directory
2. Run `bundle install`
3. Open a new terminal window and run `npm run serve`
4. Run `bundle exec rspec`

NOTE: Because resource ids are currently hardcoded in the tests you'll need to
restart your API server between test runs for accurate results.

Endpoints are documented in `openapi.yml`
