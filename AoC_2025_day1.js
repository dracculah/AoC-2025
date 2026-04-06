let example_1 = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`

function handleDialState(oldState, stepsToRotateRight)
{
    console.assert(oldState >= -100);
    console.assert(oldState <= 100);
    console.assert(stepsToRotateRight >= -100);
    console.assert(stepsToRotateRight <= 100);
    let newState = oldState + stepsToRotateRight;
    if (newState >= 0) {
        let result = newState % 100;
        return result;
    } else {
        let result = newState + 100;
        return result;
    }
    console.assert("oops!" == "");
}

function processLines(linez, initialState = 50)
{
    const reg_line = /^([L|R])(\d+)$/i;
    let currState = initialState;
    let password = 0;
    linez.forEach((line, index) => {
        if (line.trim() != "") {
            //console.log(`line => ${line}`);
            if ((match_line = reg_line.exec(line)) !== null) {
                if (match_line[1].toUpperCase() == "L") {
                    //console.log(`we will rotate left => ${match_line[2]}`);
                    // rotating left, so negative steps
                    currState = handleDialState(currState, -1 * parseInt(match_line[2]))
                }
                else if (match_line[1].toUpperCase() == "R") {
                    //console.log(`we will rotate right => ${match_line[2]}`);
                    currState = handleDialState(currState, parseInt(match_line[2]))
                }
                else {
                    console.log(`weird! Unmatched line caught => "${line}"`)
                }
            } else {
                console.log(`weird! Unmatched line caught => "${line}"`)
            }
            if (currState == 0) {
                password += 1;
            }
        }
    });
    return JSON.stringify({"endState": currState, "password": password});
}

lines = example_1.split("\n").filter((item) => item.trim() != "");
resultz = processLines(lines, 50);
res_json = JSON.parse(resultz);
console.log("endState => "+res_json["endState"]);
console.log("password => "+res_json["password"]);


