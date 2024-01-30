# Contents of replace_node.ps1

# Read the values from ./warp/peerID
$localPeerId = Select-String -Path .\warp\peerID.txt -Pattern 'Local PeerID: ([^\s]*)' | ForEach-Object { $_.Matches.Groups[1].Value }

# Update the values in ./Makefile and store in a temporary file
(Get-Content .\Makefile) -replace 'cargo build --release -F', 'SHUTTLE_ADDR_POINT=/ip4/127.0.0.1/tcp/4444/p2p/ cargo build --release -F' `
                                                      -replace 'p2p/ ', 'p2p/ ' + $localPeerId ` |
    Set-Content -Path .\Makefile

