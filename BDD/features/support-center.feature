Feature: Rally
    As a developer
    I want to fetch all the client details part of release testing

    Background:
        Given I open the url "SalesforceClassic_url"
        When I launch the salesforce application
        When I read input files for client details without member details and save them to test data file
        When I read salesforce for client details and save them to test data file


    Scenario: Validate Support Number
        Given I open the site "/"
        Then I validate support number for all clients
