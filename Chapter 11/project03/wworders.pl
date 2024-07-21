#!/usr/bin/perl

use strict;
use warnings;
use CGI;
use JSON;

my $cgi = CGI->new;
my $user = $cgi->param('id');
my $pwd = $cgi->param('pwd');

# Simulate different responses based on user id and password
if ($user eq "RW301" && $pwd eq "kaboom") {
    # Sample JSON response for RW301/kaboom
    my $response = {
        username => "John Doe",
        status => "Orders Found",
        totalCharges => "500",
        orderHistory => [
            {
                orderDate => "2024-07-22",
                orderCost => "200",
                items => [
                    {
                        description => "Firework A",
                        qty => "2",
                        price => "50",
                        total => "100"
                    },
                    {
                        description => "Firework B",
                        qty => "3",
                        price => "30",
                        total => "90"
                    }
                ]
            },
            {
                orderDate => "2024-07-20",
                orderCost => "300",
                items => [
                    {
                        description => "Sparkler C",
                        qty => "5",
                        price => "20",
                        total => "100"
                    },
                    {
                        description => "Rocket D",
                        qty => "1",
                        price => "200",
                        total => "200"
                    }
                ]
            }
        ]
    };

    print $cgi->header('application/json');
    print encode_json($response);
} elsif ($user eq "BA684" && $pwd eq "sparkler") {
    # Sample JSON response for BA684/sparkler
    my $response = {
        username => "Jane Smith",
        status => "Orders Found",
        totalCharges => "250",
        orderHistory => [
            {
                orderDate => "2024-07-21",
                orderCost => "150",
                items => [
                    {
                        description => "Sparkler A",
                        qty => "3",
                        price => "30",
                        total => "90"
                    },
                    {
                        description => "Sparkler B",
                        qty => "5",
                        price => "20",
                        total => "100"
                    }
                ]
            }
        ]
    };

    print $cgi->header('application/json');
    print encode_json($response);
} else {
    # Simulate "Orders Not Found" scenario
    my $response = {
        status => "Orders Not Found"
    };

    print $cgi->header('application/json');
    print encode_json($response);
}
