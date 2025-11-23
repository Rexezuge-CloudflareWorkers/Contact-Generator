// Simple contact generation utility
const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emily", "Robert", "Lisa", "James", "Mary"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com"];
const streets = ["Main St", "Oak Ave", "Pine Rd", "Elm St", "Maple Dr", "Cedar Ln", "Park Ave", "First St"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"];
const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "FL", "OH"];
const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany"];

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function seedRandom(): void {
    // Use current timestamp + random component for better entropy
    Math.random = (() => {
        let seed = Date.now() + Math.random() * 1000000;
        return () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    })();
}

function generatePhoneNumber(): string {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `(${areaCode}) ${exchange}-${number}`;
}

function generateZipCode(): string {
    return Math.floor(Math.random() * 90000 + 10000).toString();
}

export function generateContact(includeEmail: boolean, includePhone: boolean, includeAddress: boolean) {
    seedRandom(); // Initialize fresh seed for each contact
    
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const fullName = `${firstName} ${lastName}`;
    
    const contact: any = {
        name: fullName
    };

    if (includeEmail) {
        const emailName = firstName.toLowerCase() + "." + lastName.toLowerCase();
        const domain = getRandomElement(domains);
        contact.email = `${emailName}@${domain}`;
    }

    if (includePhone) {
        contact.phone = generatePhoneNumber();
    }

    if (includeAddress) {
        contact.address = {
            street: `${Math.floor(Math.random() * 9999) + 1} ${getRandomElement(streets)}`,
            city: getRandomElement(cities),
            state: getRandomElement(states),
            zipCode: generateZipCode(),
            country: getRandomElement(countries)
        };
    }

    return contact;
}
