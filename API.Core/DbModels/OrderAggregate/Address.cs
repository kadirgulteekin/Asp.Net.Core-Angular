namespace API.Core.DbModels.OrderAggregate
{
    public class Address
    {
        public Address()
        {

        }
        public Address(string firstName, string lastName, string street, string state, string city, string zipCode)
        {
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            State = state;
            City = city;
            ZipCode = zipCode;
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }

    }
}
