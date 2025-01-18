"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var playwright_1 = require("playwright");
var discord_js_1 = require("discord.js");
var zod_1 = require("zod");
var dotenv_1 = require("dotenv");
// Load environment variables
dotenv_1.default.config();
// Define Zod schema for validation
var envSchema = zod_1.z.object({
    DISCORD_TOKEN: zod_1.z.string().nonempty("DISCORD_TOKEN is required"),
    CHANNEL_ID: zod_1.z.string().nonempty("CHANNEL_ID is required"),
    HOUSE_NUMBER: zod_1.z.string().nonempty("HOUSE_NUMBER is required"),
    POSTCODE: zod_1.z.string().nonempty("POSTCODE is required"),
});
// Parse and validate environment variables
var env = envSchema.parse(process.env);
var DISCORD_TOKEN = env.DISCORD_TOKEN, CHANNEL_ID = env.CHANNEL_ID, HOUSE_NUMBER = env.HOUSE_NUMBER, POSTCODE = env.POSTCODE;
// Function to send a message to Discord
function postToDiscord(message) {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
                    client.once("ready", function () { return __awaiter(_this, void 0, void 0, function () {
                        var channel, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 5, 6, 8]);
                                    console.log("Bot is online!");
                                    return [4 /*yield*/, client.channels.fetch(CHANNEL_ID)];
                                case 1:
                                    channel = (_a.sent());
                                    if (!(channel && channel.isTextBased())) return [3 /*break*/, 3];
                                    return [4 /*yield*/, channel.send(message)];
                                case 2:
                                    _a.sent();
                                    console.log("Message sent to Discord:", message);
                                    return [3 /*break*/, 4];
                                case 3:
                                    console.error("Channel not found or not text-based.");
                                    _a.label = 4;
                                case 4: return [3 /*break*/, 8];
                                case 5:
                                    error_1 = _a.sent();
                                    console.error("Error sending message to Discord:", error_1);
                                    return [3 /*break*/, 8];
                                case 6: return [4 /*yield*/, client.destroy()];
                                case 7:
                                    _a.sent(); // Stop the bot after sending the message
                                    return [7 /*endfinally*/];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, client.login(DISCORD_TOKEN)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function fetchBinCollectionSchedule() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, binElements, binCount, binCollectionDetails, i, binType, binNextDate, date, today, options, todayDateFormatted, message, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, playwright_1.chromium.launch()];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 20, 21, 23]);
                    return [4 /*yield*/, page.goto("https://www.boston.gov.uk/article/27449/Your-Waste-Collections")];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel("Property name or number (").click()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel("Property name or number (").fill(HOUSE_NUMBER)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel("Property name or number (").press("Tab")];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel("Postcode:*").fill(POSTCODE)];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel("Postcode:*").press("Tab")];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole("button", { name: "Next " }).press("Enter")];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole("button", { name: "Next " }).click()];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, page.locator("#BBCWASTECOLLECTIONS_SERVICE_JOBSDISPLAY .grid__cell .item__content")];
                case 12:
                    binElements = _b.sent();
                    return [4 /*yield*/, binElements.count()];
                case 13:
                    binCount = _b.sent();
                    binCollectionDetails = [];
                    i = 0;
                    _b.label = 14;
                case 14:
                    if (!(i < binCount)) return [3 /*break*/, 18];
                    return [4 /*yield*/, binElements
                            .nth(i)
                            .locator(".item__title a")
                            .textContent()];
                case 15:
                    binType = _b.sent();
                    return [4 /*yield*/, binElements
                            .nth(i)
                            .locator('div:has-text("Next:")')
                            .textContent()];
                case 16:
                    binNextDate = _b.sent();
                    if (binType && binNextDate) {
                        date = (_a = binNextDate.split("Next:")[1]) === null || _a === void 0 ? void 0 : _a.trim();
                        binCollectionDetails.push("".concat(binType.trim(), ": ").concat(date || "No date available"));
                    }
                    _b.label = 17;
                case 17:
                    i++;
                    return [3 /*break*/, 14];
                case 18:
                    today = new Date();
                    options = {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    };
                    todayDateFormatted = today
                        .toLocaleDateString("en-GB", options)
                        .replace(",", "");
                    message = "**Next Bin Collection Dates as of ".concat(todayDateFormatted, "**:\n\n") +
                        binCollectionDetails
                            .map(function (detail) { return "".concat(detail.split(":")[0], ": ").concat(detail.split(":")[1]); })
                            .join("\n") +
                        "\n\n<https://www.boston.gov.uk/article/27449/Your-Waste-Collections>\n\n";
                    console.log("Formatted message for Discord:\n", message);
                    // Send the formatted message to Discord
                    return [4 /*yield*/, postToDiscord(message)];
                case 19:
                    // Send the formatted message to Discord
                    _b.sent();
                    return [3 /*break*/, 23];
                case 20:
                    error_2 = _b.sent();
                    console.error("Error fetching bin collection schedule:", error_2);
                    return [3 /*break*/, 23];
                case 21: return [4 /*yield*/, browser.close()];
                case 22:
                    _b.sent();
                    return [7 /*endfinally*/];
                case 23: return [2 /*return*/];
            }
        });
    });
}
// Execute the script
fetchBinCollectionSchedule();
