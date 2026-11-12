
const readline = require("readline-sync");

function getCIDR(prompt) {
    let value = readline.question(prompt);

    while (!/^\/(1[6-9]|2[0-9]|30)$/.test(value)) {
        console.log("Enter a CIDR between /16 and /30.");
        value = readline.question(prompt);
    }

    return parseInt(value.substring(1));
}

function getPositiveInteger(prompt) {
    let value = readline.question(prompt);

    while (!/^[1-9]\d*$/.test(value)) {
        console.log("Enter a positive whole number.");
        value = readline.question(prompt);
    }

    return Number(value);
}

function getYesNo(prompt) {
    let answer = readline.question(prompt).toLowerCase().trim();

    while (!["yes", "no", "y", "n"].includes(answer)) {
        console.log("Enter yes or no.");
        answer = readline.question(prompt).toLowerCase().trim();
    }

    return answer === "yes" || answer === "y";
}

function subnetHostChecker() {
    console.log("\n===== SUBNET HOST CHECKER =====");

    const vpc = getCIDR("Enter VPC CIDR (e.g., /16): ");
    const subnet = getCIDR("Enter Subnet CIDR (e.g., /24): ");
    const devices = getPositiveInteger("Enter number of devices: ");

    if (subnet < vpc) {
        console.log("Subnet CIDR consistent with VPC: NO");
        console.log("Subnet is larger than the VPC.");
        return;
    }

    const totalIPs = 2 ** (32 - subnet);
    const usableIPs = Math.max(0, totalIPs - 5);

    console.log("\n===== SUBNET RESULTS =====");
    console.log("Subnet CIDR consistent with VPC: YES");
    console.log("Total IP addresses: " + totalIPs);
    console.log("AWS reserved IP addresses: 5");
    console.log("Usable IP addresses: " + usableIPs);

    if (devices <= usableIPs) {
        console.log("Subnet sufficient for devices: YES");
        console.log("Unused IP addresses: " + (usableIPs - devices));
    } else {
        console.log("Subnet sufficient for devices: NO");
        console.log("Additional IP addresses needed: " + (devices - usableIPs));
    }
}

function computeEnvironmentSelector() {
    console.log("\n===== COMPUTE ENVIRONMENT SELECTOR =====");

    let appName = readline.question("Enter application name: ").trim();

    while (appName === "") {
        console.log("Application name cannot be empty.");
        appName = readline.question("Enter application name: ").trim();
    }

    const users = getPositiveInteger("Enter monthly users: ");

    let budget = readline.question("Enter monthly budget ($): ");

    while (budget.trim() === "" || !Number.isFinite(Number(budget)) || Number(budget) <= 0) {
        console.log("Enter a valid budget greater than zero.");
        budget = readline.question("Enter monthly budget ($): ");
    }

    budget = Number(budget);

    const ha = getYesNo("High availability required? (yes/no): ");

    let architecture;

    if (users > 10000 || ha) {
        architecture = "EC2 + Load Balancer + Auto Scaling";
    } else if (users >= 1000) {
        architecture = "EC2 + Load Balancer";
    } else {
        architecture = "Single EC2";
    }

    console.log("\n===== COMPUTE RECOMMENDATION =====");
    console.log("Application: " + appName);
    console.log("Monthly users: " + users);
    console.log("Monthly budget: $" + budget.toFixed(2));
    console.log("High availability: " + (ha ? "Yes" : "No"));
    console.log("Recommended architecture: " + architecture);

    if (budget < 1000 && architecture !== "Single EC2") {
        console.log("WARNING: Budget under $1,000. Recommended architecture requires more than a single EC2.");
    } else if (budget >= 1000 && budget <= 3000 && architecture.includes("Auto Scaling")) {
        console.log("WARNING: Budget between $1,000 and $3,000. Recommended architecture requires Auto Scaling.");
    }
}

function main() {
    let running = true;

    while (running) {
        console.log("\n===== AWS INFRASTRUCTURE TOOLS =====");
        console.log("1. Subnet Host Checker");
        console.log("2. Compute Environment Selector");
        console.log("3. Exit");

        let choice = readline.question("Select an option: ");

        while (!["1", "2", "3"].includes(choice)) {
            console.log("Invalid choice. Enter 1, 2, or 3.");
            choice = readline.question("Select an option: ");
        }

        if (choice === "1") {
            subnetHostChecker();
        } else if (choice === "2") {
            computeEnvironmentSelector();
        } else {
            console.log("Goodbye!");
            running = false;
            continue;
        }

        running = getYesNo("Return to main menu? (yes/no): ");
    }
}

main();
