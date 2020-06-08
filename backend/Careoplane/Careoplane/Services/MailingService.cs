using Careoplane.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using System.Web;

namespace Careoplane.Services
{
    public static class MailingService
    {
        public static void SendEMailInvite(AppUser inviter, AppUser user, FlightReservation flightReservation, Flight flight)
        {
            MailAddress to = new MailAddress(user.Email, user.Name);
            MailAddress from = new MailAddress("careoplane@gmail.com", "Careoplane");

            MailMessage message = new MailMessage(from, to);
            message.Subject = "Careoplane - Invitation";

            var link = string.Format("http://localhost:4200/main/flight-reservation-details?username={0}&id={1}", user.UserName, flightReservation.ReservationId);

            string text = string.Format("Hello {0},\n\n\tUser {1} {2}, has invited you to travel with him. Below are flight details:\n" +
                "\tFlight: from {3} to {4}, date: {5}\n\t" +
                "If you would like to accept or decline this invitaion, please follow this link {6}\n\n\t", user.Name, inviter.Name, inviter.Surname,flight.Origin,flight.Destination, flight.Departure.ToString(), link);

            message.Body = text;

            SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("careoplane@gmail.com", "Careoplane11-9"),
                EnableSsl = true
            }; 

            try
            {
                client.Send(message);
            }
            catch (SmtpException ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }

        public static void SendEMailReceipt(AppUser user, FlightReservation flightReservation, Flight flight)
        {
            MailAddress to = new MailAddress(user.Email, user.Name);
            MailAddress from = new MailAddress("careoplane@gmail.com", "Careoplane");

            MailMessage message = new MailMessage(from, to);
            message.Subject = "Careoplane - Receipt";

            string text = string.Format("Hello {0},You have made travel arrangements. Below are flight details:\n" +
                "\tFlight: from {1} to {2}, date: {3}\n\t", user.Name, flight.Origin, flight.Destination, flight.Departure.ToString());

            message.Body = text;

            SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("careoplane@gmail.com", "Careoplane11-9"),
                EnableSsl = true
            };

            try
            {
                client.Send(message);
            }
            catch (SmtpException ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }
    }
}
